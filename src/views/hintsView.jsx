import "/src/style.css";

export function NoDisplayHintView() {
    return (
        <div className="no-hint-view">
            <p>No hints available yet. Keep guessing!</p>
        </div>
    );
}

export function HintView({ hint }) {
    return (
        <div className="hint-view">
            <p>{hint}</p>
        </div>
    );
}