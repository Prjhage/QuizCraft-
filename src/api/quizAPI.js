import axios from "axios";
export const fetchQuestionsBySubject = async(subject) => {
    const exclude =
        JSON.parse(localStorage.getItem(`usedQuestions-${subject}`)) || [];

    try {
        console.log("Fetching:", subject);
        const response = await axios.post(
            `http://localhost:5000/api/questions/${subject}`, { exclude }
        );
        console.log("Received:", response.data);

        return response.data; // ✅ correct variable name
    } catch (err) {
        console.error("Error fetching questions:", err);
        return [];
    }
};