export const userStoryData = {
    "user_story": {
        "stall_owners": {
            "needs": [
                {
                    "role": "As a stall owner",
                    "goal": "I want to ensure customers can locate my stall accurately",
                    "benefit": "So that I can increase customer convenience and reduce payment errors."
                }
            ],
            "bdd_gherkin": [
                {
                    "given": "The stall owner has registered their stall location and name in the M-Pesa app",
                    "when": "A customer opens the app and navigates to the payment screen",
                    "then": "The correct stall name and location are displayed based on proximity and GPS coordinates"
                },
                {
                    "given": "A stall owner has updated their GPS location in the app",
                    "when": "A customer attempts to pay at the stall",
                    "then": "The updated location information is reflected on the customer's payment screen to ensure accurate payment"
                }
            ]
        },
        "matatu_operators": {
            "needs": [
                {
                    "role": "As a matatu operator",
                    "goal": "I want to facilitate accurate and quick fare collection",
                    "benefit": "So that I can improve the passenger experience and ensure secure payments."
                }
            ],
            "bdd_gherkin": [
                {
                    "given": "The matatu is within a certain range of the passenger’s device and the operator has verified their identity in the app",
                    "when": "A passenger opens the app to pay their fare",
                    "then": "The fare collection prompt is displayed with the correct matatu details"
                },
                {
                    "given": "The operator is confirmed as verified within the app",
                    "when": "A passenger selects the matatu in the app to make the payment",
                    "then": "The payment is securely directed to the correct matatu operator"
                }
            ]
        },
        "mpesa_users": {
            "needs": [
                {
                    "role": "As an M-Pesa user",
                    "goal": "I want to make accurate payments to the correct stall or matatu",
                    "benefit": "So that I can avoid payment errors and ensure secure transactions."
                }
            ],
            "bdd_gherkin": [
                {
                    "given": "The user is within range of a nearby stall or matatu with a valid location",
                    "when": "The user selects a stall or matatu from the app's list of nearby vendors",
                    "then": "The selected vendor's information is clearly displayed with a confirmation prompt before completing the payment"
                },
                {
                    "given": "The user is viewing a list of nearby vendors in the app",
                    "when": "The user selects the wrong vendor",
                    "then": "The app displays a warning or prompts the user to confirm the selection before completing the payment"
                }
            ]
        }
    }
}
