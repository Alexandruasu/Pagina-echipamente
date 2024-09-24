document.addEventListener("DOMContentLoaded", function() {
    console.log("Script echipe.js este încărcat și executat.");

    const sortButton = document.getElementById("sortButton");
    const filterButton = document.getElementById("filterButton");
    const resetButton = document.getElementById("resetButton");
    const selectedCountElement = document.getElementById("selectedCount");

    sortButton.addEventListener("click", sortTeams);
    filterButton.addEventListener("click", filterTeams);
    resetButton.addEventListener("click", resetSelections);

    // Initializez in localStorage
    const selectedNames = new Set(JSON.parse(localStorage.getItem("selectedNames")) || []);
    updateSelectedCount();
    highlightSelectedNames();

    // butoanele
    document.querySelectorAll(".select-button").forEach(button => {
        button.addEventListener("click", function() {
            const nameElement = this.parentElement;
            const name = nameElement.textContent.trim();
            
            if (selectedNames.has(name)) {
                selectedNames.delete(name);
                nameElement.style.border = "none";
            } else {
                selectedNames.add(name);
                nameElement.style.border = "2px solid red";
            }

            localStorage.setItem("selectedNames", JSON.stringify(Array.from(selectedNames)));
            updateSelectedCount();
        });
    });

    function sortTeams() {
        const sortOrder = document.getElementById("sortOrder").value;
        const teams = document.querySelectorAll(".echipa");

        teams.forEach(team => {
            const membersList = team.querySelector(".membri-echipa");
            const members = Array.from(membersList.querySelectorAll("li"));

            members.sort((a, b) => {
                const aPrenume = a.textContent.split(' ').slice(0, -1).join(' ');
                const bPrenume = b.textContent.split(' ').slice(0, -1).join(' ');

                if (aPrenume.length !== bPrenume.length) {
                    return sortOrder === "ascendent" ? aPrenume.length - bPrenume.length : bPrenume.length - aPrenume.length;
                }
                return sortOrder === "ascendent" ? a.textContent.localeCompare(b.textContent) : b.textContent.localeCompare(a.textContent);
            });

            members.forEach(member => membersList.appendChild(member));
        });
    }

    function filterTeams() {
        const filterValue = document.querySelector('input[name="filter"]:checked').value;
        const teams = document.querySelectorAll(".echipa");

        teams.forEach(team => {
            const isActive = team.dataset.active === "true";
            if (filterValue === "toate") {
                team.style.display = "block";
            } else if (filterValue === "active" && isActive) {
                team.style.display = "block";
            } else if (filterValue === "inactive" && !isActive) {
                team.style.display = "block";
            } else {
                team.style.display = "none";
            }
        });
    }

    function resetSelections() {
        selectedNames.clear();
        localStorage.removeItem("selectedNames");
        document.querySelectorAll(".membri-echipa li").forEach(nameElement => {
            nameElement.style.border = "none";
        });
        updateSelectedCount();
    }

    function updateSelectedCount() {
        selectedCountElement.textContent = `Numărul de nume selectate: ${selectedNames.size}`;
    }

    function highlightSelectedNames() {
        document.querySelectorAll(".membri-echipa li").forEach(nameElement => {
            const name = nameElement.textContent.trim();
            if (selectedNames.has(name)) {
                nameElement.style.border = "2px solid red";
            }
        });
    }
});
