import { fetchAndActivate, getString } from "firebase/remote-config";
import { db, remoteConfig } from "./firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  startAfter,
  onSnapshot,
  writeBatch,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  arrayRemove,
  Timestamp,
  arrayUnion,
  getDoc,
  setDoc,
} from "firebase/firestore";

// Get user's chat list
// export const getChats = async (uid) => {
//   try {
//     const chatsRef = collection(db, 'chats');
//     const q = query(chatsRef, where('members', 'array-contains', uid));
//     const chatSnapshot = await getDocs(q);

//     const chats = chatSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     console.log(chats)
//     return chats;
//   } catch (error) {
//     console.error('Error fetching chats:', error);
//     return [];
//   }
// };

// Fetch existing chat room

export const createChatRoom = async ({
  members,
  chatName = "Chat Room",
  imageUrl = "",
  sellerId,
  buyerId,
  last_msg,
}) => {
  try {
    const chatBody = {
      members: members,
      last_msg: last_msg,
      created_at: serverTimestamp(),
      chat_name: chatName,
      image_url: imageUrl,
      order_status: "Approved",
      updated_at: {
        [sellerId]: serverTimestamp(),
        [buyerId]: serverTimestamp(),
      },
    };

    const chatDocRef = await addDoc(collection(db, "chats"), chatBody);
    console.log(chatDocRef.id, "chatDocRef.id");
    return {
      id: chatDocRef.id,
      ...chatBody,
    };
  } catch (error) {
    console.error("Error creating chat room:", error);
    throw error;
  }
};

export const getExistingChatRoom = async (members) => {
  const chatsRef = collection(db, "chats");

  // Check chats where one member exists (broad filter)
  const q = query(chatsRef, where("members", "array-contains", members[0]));
  const querySnapshot = await getDocs(q);

  for (let doc of querySnapshot.docs) {
    const data = doc.data();

    // Compare both arrays regardless of order
    if (
      Array.isArray(data.members) &&
      data.members.length === members.length &&
      data.members.every((id) => members.includes(id))
    ) {
      return {
        id: doc.id,
        ...data,
      };
    }
  }

  return null;
};

// Get user chats list updated

export const fetchUser = async (uid) => {
  try {
    const userRef = doc(db, "dispensaries", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() };
    }

    return null;
  } catch (err) {
    console.error("🔥 Error fetching user:", err);
    return null;
  }
};

export const getChats = async (uid) => {
  try {
    const chatsRef = collection(db, "chats");
    const q = query(
      chatsRef,
      where("members", "array-contains", uid),
      where("order_status", "!=", "Completed")
    );

    const chatSnapshot = await getDocs(q);

    const chatData = chatSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const chatWithOtherUsers = await Promise.all(
      chatData.map(async (chat) => {
        const otherUserId = chat.members.find((memberId) => memberId !== uid);

        const otherUser = await fetchUser(otherUserId);

        return {
          ...chat,
          otherUser: otherUser, // attach here
        };
      })
    );
    console.log(chatData, "chatData==>");
    return chatWithOtherUsers;
  } catch (error) {
    console.error("🔥 Error fetching chats:", error);
    return [];
  }
};

export const updateOrderStatus = async (chatRoomId, status) => {
  try {
    const chatDocRef = doc(db, "chats", chatRoomId);
    await updateDoc(chatDocRef, { order_status: status });
  } catch (error) {
    console.error("Error updating order status:", error);
  }
};

export const sendMessage = async (chatId, senderId, messageText) => {
  if (!chatId || !messageText.trim()) return;

  const messagesRef = collection(db, `chats/${chatId}/messages`);
  const chatRef = doc(db, `chats`, chatId);
  await updateDoc(chatRef, {
    last_msg: {
      content: messageText,
      content_type: "text",
      is_read: false,
      sender_id: senderId,
      timestamp: serverTimestamp(),
    },
  });
  await addDoc(messagesRef, {
    sender_id: senderId,
    content: messageText,
    is_read: false,
    timestamp: serverTimestamp(),
  });
};

export const getMessages = (chatId, callback, updatedAt) => {
  if (!chatId) return;

  const messagesRef = collection(db, `chats/${chatId}/messages`);
  const messagesQuery = query(
    messagesRef,
    where("timestamp", ">", updatedAt),
    orderBy("timestamp", "asc")
  );

  return onSnapshot(
    messagesQuery,
    (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      callback(messages);
    },
    (error) => console.error("Error fetching messages:", error)
  );
};

// Mark messages as read
export const markMessagesAsRead = async (chatId, uid) => {
  try {
    // Reference the messages subcollection for the given chat
    const messagesRef = collection(db, `chats/${chatId}/messages`);

    // Query unread messages not sent by the user
    const messagesQuery = query(
      messagesRef,
      where("sender_id", "!=", uid),
      where("is_read", "==", false)
    );

    // Fetch the unread messages
    const messagesSnapshot = await getDocs(messagesQuery);

    // Create a batch to perform multiple updates
    const batch = writeBatch(db);

    // Add each message update to the batch
    messagesSnapshot.docs.forEach((doc) => {
      const messageRef = doc.ref;
      batch.update(messageRef, { is_read: true });
    });

    // Commit the batch to apply all updates
    await batch.commit();
    console.log(`Marked messages as read for chat ${chatId}`);
  } catch (error) {
    console.error("Error marking messages as read:", error);
  }
};

// Get unread message count per chat
export const getUnreadMessageCount = async (uid) => {
  try {
    // Query chats where the user is a member
    const chatsRef = collection(db, "chats");
    const chatsQuery = query(chatsRef, where("members", "array-contains", uid));
    const chatSnapshot = await getDocs(chatsQuery);

    let unreadCount = {};

    // Loop through each chat
    for (const chatDoc of chatSnapshot.docs) {
      const chatId = chatDoc.id;

      // Query unread messages in the chat
      const messagesRef = collection(db, `chats/${chatId}/messages`);
      const messagesQuery = query(
        messagesRef,
        where("sender_id", "!=", uid),
        where("is_read", "==", false)
      );
      const unreadMessagesSnapshot = await getDocs(messagesQuery);

      // Store the count of unread messages for this chat
      unreadCount[chatId] = unreadMessagesSnapshot.size;
    }

    return unreadCount;
  } catch (error) {
    console.error("Error fetching unread message count:", error);
    return {};
  }
};

export const blockChatRoom = async (chatId, userId, closeModal) => {
  try {
    const chatDoc = doc(db, "chats", chatId);

    await updateDoc(chatDoc, {
      blocked_ids: arrayUnion(userId),
    });
    closeModal();
  } catch (e) {
    throw new Error(`Failed to block chat room: ${e}`);
  }
};

export const unblockChatRoom = async (chatId, userId, closeModal) => {
  try {
    const chatDoc = doc(db, "chats", chatId);

    await updateDoc(chatDoc, {
      blocked_ids: arrayRemove(userId),
    });
    closeModal();
  } catch (e) {
    throw new Error(`Failed to unblock chat room: ${e}`);
  }
};

export const deleteChatForUser = async (
  chatId,
  userId,
  closeModal,
  setMessages
) => {
  try {
    const updatedAt = {
      [userId]: Timestamp.now(),
    };
    const chatDoc = doc(db, "chats", chatId);
    updatedAt[userId] = Timestamp.now();

    await updateDoc(chatDoc, {
      [`updated_at.${userId}`]: Timestamp.now(),
    });

    closeModal();
    getMessages(chatId, setMessages, updatedAt);
  } catch (e) {
    throw new Error(`Failed to soft delete chat: ${e}`);
  }
};

// Listen to blocked users in a chat
export const listenToBlockedUsers = (chatId, callback) => {
  return onSnapshot(
    doc(db, "chats", chatId),
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();

        callback(data?.blocked_ids || []);
      }
    },
    (error) => console.error("Error listening to blocked users:", error)
  );
};

export async function getRemoteConfigData() {
  try {
    await fetchAndActivate(remoteConfig);
    const jsonString = getString(remoteConfig, "legal_cannabis_states");
    const jsonData = JSON.parse(jsonString);
    return jsonData;
  } catch (error) {
    console.error("Error fetching or parsing remote config:", error);
    return null;
  }
}
