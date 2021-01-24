export const HIDDEN_CLASS = "hidden";
export const HIDDEN_SCREEN = false;
export const VISIBLE_SCREEN = true;

/**
 * Class with common methods, they can repeat in all classes
 */

export class Common {
    /**
     * @param {!string} elementId Id of an HTMLElement, it should be main layer element.
     */
    constructor(elementId) {
        if (typeof elementId === "undefined") {
            return;
        }
        this.element = this.bindToElement(elementId);
    }

    /**
     * Method to find HTMLElement with provided id
     * @param {string} elementToFindById Id of HTMLElement
     * @returns {HTMLElement} HTMLElement with provided id
     * @throws {Error} Will throw an error if element with provided id does not exist.
     */
    bindToElement(elementToFindById) {
        const element = document.getElementById(elementToFindById);

        if (!element) {
            throw new Error(`Nie znaleziono elementu Id: ${elementToFindById}`);
        }

        return element;
    }

    /**
     * Method for hide or show HTMLElement
     * @param {HTMLElement} element Element which you will to hide or show
     * @param {boolean} mode HIDDEN_SCREEN or VISIBLE_SCREEN. These constants are exported from this class
     */
    changeVisibilityScreen(element, mode) {
        mode === VISIBLE_SCREEN
            ? element.classList.remove(HIDDEN_CLASS)
            : element.classList.add(HIDDEN_CLASS);
    }
}
