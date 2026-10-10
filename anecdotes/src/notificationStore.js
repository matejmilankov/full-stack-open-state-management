import { create } from "zustand";

let timeoutId = null;

const useNotificationStore = create((set) => ({
    notification: '',
    actions: {
        notify: (message, seconds = 2) => {
            clearTimeout(timeoutId);
            set({ notification: message});
            timeoutId = setTimeout(() => set({ notification: ''}), seconds * 1000);
        }
    }
}))

export const useNotification = () => useNotificationStore(state => state.notification);
export const useNotificationActions = () => useNotificationStore(state => state.actions);
