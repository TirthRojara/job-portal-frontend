import { inter } from "@/app/layout";

export type ChatListParams = {
    limit: number;
    companyId?: number;
    lastMessageAt?: string;
    chatId?: number;
};

export interface ChatListItem {
    id: number;
    candidateProfileId: number;
    companyId: number;
    chatRoomId: string;

    companyUnreadCount: number;
    candidateUnreadCount: number;

    lastMessage: string | null;
    lastMessageAt: string;
    createdAt: string;
    updatedAt: string;

    candidateProfile: {
        fullName: string;
    };

    company: {
        name: string;
    };
}

export interface ChatListCursor {
    id: number;
    lastMessageAt: string;
}

export interface ChatListResponse {
    chatList: ChatListItem[];
    nextCursor: ChatListCursor | null;
}

// export type ChatListResponse = {
//     chatList: {
//         id: number;
//         candidateProfileId: number;
//         companyId: number;
//         chatRoomId: string;

//         companyUnreadCount: number;
//         candidateUnreadCount: number;

//         lastMessage: string | null;
//         lastMessageAt: string;
//         createdAt: string;
//         updatedAt: string;

//         candidateProfile: {
//             fullName: string;
//         };

//         company: {
//             name: string;
//         };
//     }[];

//     nextCursor: {
//         id: number;
//         lastMessageAt: string;
//     } | null;
// };

export interface Messages {
    id: number;
    chatId: number;
    senderId: number;
    receiverId: number;
    content: string;
    isRead: boolean;
    createdAt: string; // ISO string
}

export interface MessageCursor {
    nextCursor: number | null;
}

export interface MessageResponse {
    messages: Messages[];
    nextCursor: number | null;
}

// export interface MessageResponse {
//     messages: {
//         id: number;
//         chatId: number;
//         senderId: number;
//         receiverId: number;
//         content: string;
//         isRead: boolean;
//         createdAt: string; // ISO string
//     }[];

//     nextCursor: number | null;
// }

// ===========================

export type Chat = {
    id: number;
    chatRoomId: string;
    candidateProfileId: number;
    companyId: number;
    companyUnreadCount: number;
    candidateUnreadCount: number;
    lastMessage: string | null;
    lastMessageAt: Date;
};

export type Message = {
    id: number;
    createdAt: Date;
    chatId: number;
    senderId: number;
    receiverId: number;
    content: string;
    isRead: boolean;
};

export type CreateNewMessageResponse = {
    newChat: Chat;
    newMessage: Message;
};

export type CreateChatResponse = {
    id: number;
    chatRoomId: string;
    candidateProfileId: number;
    companyId: number;
    companyUnreadCount: number;
    candidateUnreadCount: number;
    lastMessage: string | null;
    lastMessageAt: Date;
    createdAt: Date;
    updatedAt: Date;
};

export type markAsReadResponse = {
    id: number;
    chatRoomId: string;
    companyUnreadCount: number;
    candidateUnreadCount: number;
    senderId: number;
};
