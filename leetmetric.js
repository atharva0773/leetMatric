document.addEventListener('DOMContentLoaded', function () {
    const searchbtn = document.getElementById('btn');
    const userinput = document.getElementById('userinp');

    function validateusername(username) {
        if (username.trim() === "") return false;
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const ok = regex.test(username);
        if (!ok) alert("Invalid username");
        return ok;
    }

    async function fetchuserdetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try {
            searchbtn.textContent = "Searching...";
            searchbtn.disabled = true;

            const res = await fetch(url);
            if (!res.ok) throw new Error("Unable to fetch");

            const data = await res.json();
            console.log("Logging data:", data);

            const easyTotal = data.totalEasy;
            const mediumTotal = data.totalMedium;
            const hardTotal = data.totalHard;

            const easySolved = data.easySolved;
            const mediumSolved = data.mediumSolved;
            const hardSolved = data.hardSolved;

            // Update the cards by targeting the <span> inside each card
            const easyCard = document.querySelector('.card-item .easy');
            const mediumCard = document.querySelector('.card-item .medium');
            const hardCard = document.querySelector('.card-item .hard');

            if (easyCard) easyCard.innerText = `${easySolved}/${easyTotal}`;
            if (mediumCard) mediumCard.innerText = `${mediumSolved}/${mediumTotal}`;
            if (hardCard) hardCard.innerText = `${hardSolved}/${hardTotal}`;

            // Easy
            const Ecircle = document.querySelector('.circleeasy');
            const Eangle = (easySolved / easyTotal) * 360;
            Ecircle.style.background = `conic-gradient(#4caf50 ${Eangle}deg, #c28787 0deg)`;

            // Medium
            const Mcircle = document.querySelector('.circlemedium');
            const Mangle = (mediumSolved / mediumTotal) * 360;
            Mcircle.style.background = `conic-gradient(#4caf50 ${Mangle}deg, #c28787 0deg)`;

            // Hard
            const Hcircle = document.querySelector('.circlehard');
            const Hangle = (hardSolved / hardTotal) * 360;
            Hcircle.style.background = `conic-gradient(#4caf50 ${Hangle}deg, #c28787 0deg)`;



        } catch (err) {
            console.error("Fetch error:", err);
            alert("Failed to fetch user details.");
        } finally {
            searchbtn.textContent = "Search";
            searchbtn.disabled = false;
        }
    }

    searchbtn.addEventListener('click', function () {
        const username = userinput.value.trim();
        if (validateusername(username)) {
            fetchuserdetails(username);
        }
    });
});
