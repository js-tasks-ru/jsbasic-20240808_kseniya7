function showSalary(users, age) {
  let filterUsers = users.filter(user => user.age <= age);
  let result = filterUsers.map(user => `${user.name}, ${user.balance}`);
  return result.join('\n');
}
