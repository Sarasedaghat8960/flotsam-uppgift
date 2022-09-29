import { expectedResult, getAllAssignments, getUserById } from "./assignmentClient";

describe("display a list of all the assignment with username and number of assignments per user", () => {
    it("should be sorted on by username and assignment id", async () => {
        const result = await getAllAssignments(); 
        

        // Assert
        expect(result).toEqual(expectedResult);
    });
})