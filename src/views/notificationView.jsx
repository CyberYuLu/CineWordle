import "/src/style.css";

export function NotificationView({ notification, isCorrect }) {
    if (!notification) return null;

    return (
        <div className={`notification ${isCorrect ? "correct" : "incorrect"}`}>
            {notification}
        </div>
    );
}