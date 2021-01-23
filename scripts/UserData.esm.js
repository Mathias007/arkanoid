class UserData {
    constructor() {
        if (!localStorage.length) {
            localStorage.setItem("1", JSON.stringify({ active: true }));
        }
    }

    checkAvailabilityLevel(levelNumber) {
        const item = localStorage.getItem(String(levelNumber));

        if (!item) {
            return false;
        }

        const { active } = JSON.parse(item);

        return active;
    }

    addNewLevel(levelNumber) {
        localStorage.setItem(
            String(levelNumber),
            JSON.stringify({ active: true })
        );
    }
}

export const userData = new UserData();
