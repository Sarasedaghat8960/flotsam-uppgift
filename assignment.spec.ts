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
        const userObj = (await getUserById(
          assignment.userId
        )) as userWithnumberOfPostsType;
        userObj.numberOfPosts = result.filter(
          (assignment: any) => assignment.userId == userObj.id
        ).length;
        const { userId, ...resultWithOutUserId } = assignment;

        return { ...resultWithOutUserId, user: userObj };
      })
    );

    resultWithUser.sort(
      (a, b) => a.user.name.localeCompare(b.user.name) || a.id - b.id
    );
    console.log(resultWithUser);

    // Assert
    expect(resultWithUser).toEqual(expectedResult);
  });
});
