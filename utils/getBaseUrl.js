export const getBaseUrl = () => {
    if (typeof window !== "undefined") {
        return "";
    }

    return process.env.NEXTAUTH_URL || "http://localhost:3000";
};
