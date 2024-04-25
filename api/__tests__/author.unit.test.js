
const User = require("../src/models/user.model");
const Author = require('../src/models/author.model');

const dummyUser = {
    firstName: "Jhon",
    lastName: "Doe",
    email: "jhon.doe@email.com",
    password: "password123"
}

describe('Author model tests', () => {
    let user1;
    beforeAll(async function() {
        user1 = await User.create(dummyUser)
    })

    afterEach(async function () {
        await Author.deleteMany();
    });

    afterAll(async function() {
        await User.deleteMany()
    })


    it('should create a new author', async () => {
        const dummyAuthor = {
            firstName: 'John',
            lastName: 'Doe',
            yearOfBirth: 1990,
            primaryGenre: 'Fiction'
        };
        const author = await Author.create(dummyAuthor);

        //TODO: finish test
    });

    //TODO: should not create an author without a user

    //TODO: test other required fields

    //TODO: test author cannot be created with invalid yearOFBirth
});