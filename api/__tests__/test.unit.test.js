
let users = [1,2,3]

it('test addition', function() {
    expect(1+2).toBe(3)
})

it('adds a user', function() {
    expect(users.length).toBe(3)
    users.push(4)
    //TODO: add user
    expect(users.length).toBe(4)
})

test('a new user does not have the same id', function() {
    users.push(4)

    expect(Array.from(new Set(users)).length).toBe(4)
})