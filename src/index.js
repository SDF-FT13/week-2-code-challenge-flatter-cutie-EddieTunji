// Fetch characters and populate character bar
const loadCharacters = () => {
    fetch("http://localhost:3000/characters")
      .then(response => response.json())
      .then(characters => {
        const characterBar = document.getElementById("character-bar");
        if (!characterBar) {
          console.error("Character bar element not found.");
          return;
        }
        characterBar.innerHTML = "";
        characters.forEach(character => {
          const charButton = document.createElement("button");
          charButton.textContent = character.name;
          charButton.addEventListener("click", () => displayCharacter(character));
          characterBar.appendChild(charButton);
        }); 
      })
      .catch(err => console.error("Error fetching characters:", err));
  };
  
  const displayCharacter = character => {
    const nameElement = document.getElementById("name");
    const imageElement = document.getElementById("image");
    const voteCountElement = document.getElementById("vote-count");
    const voteInputElement = document.getElementById("votes");
    const resetVoteButton = document.getElementById("reset-btn");
  
    if (!nameElement || !imageElement || !voteCountElement || !voteInputElement || !resetVoteButton) {
      console.error("One or more elements not found!", { nameElement, imageElement, voteCountElement, voteInputElement, resetVoteButton });
      return;
    }
    
    nameElement.textContent = character.name;
    imageElement.src = character.image;
    imageElement.alt = character.name;
    voteCountElement.textContent = character.votes;
    voteInputElement.value = "";
  
    document.getElementById("votes-form").onsubmit = (event) => {
      event.preventDefault();
      updateVotes(character.id, true);
    };
  
    resetVoteButton.onclick = () => updateVotes(character.id, false);
  };
  
  const updateVotes = (id, isAdding) => {
    const voteInput = document.getElementById("votes");
    const voteCount = document.getElementById("vote-count");
    if (!voteInput || !voteCount) {
      console.error("Vote input or vote count element not found!");
      return;
    }
  
    let inputVotes = parseInt(voteInput.value, 10) || 0;
    let currentVotes = parseInt(voteCount.textContent, 10) || 0;
    let newVotes = isAdding ? currentVotes + inputVotes : 0;
  
    // Update UI immediately without waiting for fetch
    voteCount.textContent = newVotes;
    voteInput.value = "";
  
    fetch(`http://localhost:3000/characters/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ votes: newVotes })
    })
    .then(response => response.json())
    .catch(err => console.error("Error updating votes:", err));
  };
  
  
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed.");
    loadCharacters();
  }); 

  
  
  