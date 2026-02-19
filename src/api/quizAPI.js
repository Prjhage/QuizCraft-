import axios from "axios";
export const fetchQuestionsBySubject = async (subject) => {
    const excludeData =
        JSON.parse(localStorage.getItem(`usedQuestions-${subject}`)) || [];
    const exclude = Array.isArray(excludeData) ? [...new Set(excludeData)] : [];

    try {
        console.log("Fetching questions for:", subject, "Excluding:", exclude.length);
        const response = await axios.post(
            `/api/questions/${subject}`, { exclude }
        );

        if (!response.data || !Array.isArray(response.data)) {
            throw new Error("Invalid response format from server");
        }

        console.log("Received questions count:", response.data.length);

        return response.data;
    } catch (err) {
        console.error("Error fetching questions:", err.message || err);
        return [];
    }
};