
const User = require('../src/models/user.model');

describe("User model tests", function() {
    const dummyUser = {
        firstName: "Jhon",
        lastName: "Doe",
        email: "jhon.doe@email.com",
        password: "password123"
    }

    it("Creates a user with valid data",async function() {
        const user = await User.create(dummyUser)

        expect(user.firstName).toBe("Jhon")
        expect(user.email).toBe("jhon.doe@email.com")

        const users = await User.find()
        expect(users).toHaveLength(1)
    })

    it("Does not create a user without email", async function() {
        try {
            await User.create({
                ...dummyUser,
                email: undefined
            })
            
        } catch(error) {
            expect(error.message).toMatch("Path `email` is required.")
        }
    })

    it("does not create a user with an invalid email", async function() {
        try {
            await User.create({
                ...dummyUser,
                email: "jhon.doeemail.com"
            })
            
        } catch(error) {
            expect(error.message).toMatch("Path `email` is invalid")
        }
    })
})