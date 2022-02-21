class UserSerializer{
  static getSummary(userArray){
    const allowedAttributes = ['id', 'details', 'grade', 'age', 'image', 'location', 'name', 'style']

    const serializedUsers = userArray.map((user) => {
      const serializedUser = {}
      for(const attribute of allowedAttributes){
        serializedUser[attribute] = user[attribute]
      }
      return serializedUser
    })
    
    return serializedUsers
  }
}

export default UserSerializer