
const User = require("../src/models/user.model");
const Author = require('../src/models/author.model');

const dummyUser = {
    firstName: "Jhon",
    lastName: "Doe",
    email: "jhon.doe@email.com",
    password: "password123"
}

const dummyAuthor = {
    firstName: 'John',
    lastName: 'Doe',
    yearOfBirth: 1990,
    primaryGenre: 'Fiction',
    createdBy: undefined
};

let user1;

describe('Author model tests', () => {
    
    beforeAll(async function() {
        user1 = await User.create(dummyUser)
    });

    afterEach(async function () {
        await Author.deleteMany();
    });

    afterAll(async function() {
        await User.deleteMany()
    });


    it('should create a new author', async () => {
        const author = await Author.create({
            ...dummyAuthor,
            createdBy: user1?._id
        });
        expect(author.firstName).toBe("John")
    });

    it('should not create a new author without a user', async () => {

        try {
            const author = await Author.create({
                ...dummyAuthor,
                createdBy: undefined
            });
        } catch (error) {
            expect(error.message).toMatch("Path `createdBy` is required")
        }
    });

    it('should not create a author without required fields', async function() {
        try {
            const author = await Author.create({
                ...dummyAuthor,
                createdBy: user1?._id,
                firstName: undefined,
                lastName: undefined,
                yearOfBirth: undefined,
                primaryGenre: undefined

            });
        } catch (error) {
            expect(error.message).toMatch("Author validation failed")
            expect(error.message).toMatch("firstName")
            expect(error.message).toMatch("lastName")
            expect(error.message).toMatch("yearOfBirth")
            expect(error.message).toMatch("primaryGenre")
        }
    })

    it('should not create a author with invalid yearOfBirth: less than min ', async function() {
        try {
            const author = await Author.create({
                ...dummyAuthor,
                createdBy: user1?._id,
                yearOfBirth: 159
            });
            expect(author.yearOfBirth).toBe(1602)
        } catch (error) {
            expect(error.message).toMatch("yearOfBirth: Path `yearOfBirth`")
            expect(error.message).toMatch("is less than minimum allowed value")
        }
    })


    //TODO: test author cannot be created with invalid yearOFBirth
});