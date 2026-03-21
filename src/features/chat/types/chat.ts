export type MessageStatus = {
    SENDING: 'SENDING',
    SENT: 'SENT',
    READ: 'READ',
    FAILED: 'FAILED',
    DELETED: 'DELETED',
};

export type MessageActionType = {
    PIN_MESSAGE: 'PIN_MESSAGE'
};

export type MessageType = {
    TEXT: 'TEXT',
    PHOTO: 'PHOTO',
    VIDEO: 'VIDEO',
    DOCUMENT: 'DOCUMENT',
    ACTION: 'ACTION',
};

export interface Document {
    id: string;
    fileName: string;
    mimeType: string;
    size: number;
    date: string; // Trong JS/TS, Instant thường được map thành ISO String
}

export interface Video {
    id: string;
    duration: number;
    fileName: string;
    mediaType: string;
    mimeType: string;
    size: number;
    width: number;
    height: number;
    date: string;
}

export interface Photo {
    id: string;
    date: string;
    size: number;
    mimeType: string;
    fileName: string;
}

export interface TextContent {
    text: string;
}

export interface Action {
    type: MessageActionType;
}

// Interface Content - chứa các loại dữ liệu khác nhau
export interface Content {
    document?: Document[];
    video?: Video[];
    photo?: Photo[];
    text?: TextContent;
    action?: Action;
}

// Các interface phụ khác (dựa theo field trong MessageHistory)
export interface Mention {
    userId: string;
    displayName: string;
}

export interface Reply {
    messageId: string;
    senderId: string;
    excerpt: string; // Tóm tắt nội dung tin nhắn được reply
}

// Interface chính: MessageHistory
export interface MessageHistory {
    id: string;
    msgId: number;
    clientMsgId: string;
    conversationId: string;
    senderId: string;
    content: Content;
    type: MessageType;
    status: MessageStatus;
    summaryReaction?: Record<string, number>; // Map<String, Long> -> Record trong TS
    mentions?: Mention[];
    reply?: Reply;
    isEdited: boolean;
    isPinned: boolean;
    groupId?: string;
    sentAt: string; // Instant map thành string (ISO 8601)
}