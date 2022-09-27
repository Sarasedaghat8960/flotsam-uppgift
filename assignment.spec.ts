import { expectedResult, getAllAssignments, getUserById } from "./assignmentClient";

describe("display a list of all the assignment with username and number of posts per user", () => {
    it("should be sorted on by username and post id", async () => {
        const result = await getAllAssignments(); 
        
        // Assert
        expect(result).toEqual(expectedResult);
    });
})