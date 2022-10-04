import {
  expectedResult,
  getAllAssignments,
  getUserById,
} from "./assignmentClient";

describe("display a list of all the assignment with username and number of assignments per user", () => {
  it("should be sorted on by username and assignment id", async () => {
    const result = await getAllAssignments();

    type userWithnumberOfPostsType = {
      id: string;
      name: string;
      numberOfPosts: number;
    };
    const resultWithUser = await Promise.all(
      result.map(async (assignment: any) => {
        //Find user with same assignment's userId
        const userWithnumberOfPostsType = (await getUserById(
          assignment.userId
        )) as userWithnumberOfPostsType;
        //Add numberOfPosts to user object
        userWithnumberOfPostsType.numberOfPosts = result.filter(
          (assignment: any) => assignment.userId == userWithnumberOfPostsType.id
        ).length;
        // devide or delete userId from result
        const { userId, ...resultWithOutUserId } = assignment;
        // add and return result with user
        return { ...resultWithOutUserId, user: userWithnumberOfPostsType };
      })
    );

    resultWithUser.sort(
      (a, b) => a.user.name.localeCompare(b.user.name) || a.id - b.id
    );
    // console.log(resultWithUser);

    // Assert
    expect(resultWithUser).toEqual(expectedResult);
  });
});
