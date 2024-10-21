async function searchPokemon(){
    const pokemonName = document.getElementById('pokemon-name').value.toLowerCase();
    const apiURL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    const pokemonDataDiv = document.getElementById('pokemon-data')

    try{
        const response = await fetch(apiURL);

        if(!response.ok){
            throw new Error("Pokémon não encontrado");
        }

        const data = await response.json();

        // Escrever os dados do Pokémon
        pokemonDataDiv.innerHTML = `
            <h2>${data.name} (# ${data.id}) </h2>
            <img src="${data.sprites.front_default}" alt="Imagem do Pokémon">
            <container>
                <p>Tipo: ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
                <p>Habilidades: ${data.abilities.map(abilitiesInfo => abilitiesInfo.ability.name).join(', ')}</p>
                <p>Descrição: ${
                    data.species && data.species.flavor_text_entries && data.species.flavor_text_entries.length > 0
                        ? data.species.flavor_text_entries[0].flavor_text
                        : "Descrição não disponível"
                }</p>
                <p>Estatísticas:</p>
            </container>
            <ul>
                <li>Ataque: ${data.stats[1] ? data.stats[1].base_stat : "N/A"}</li>
                <li>Defesa: ${data.stats[2] ? data.stats[2].base_stat : "N/A"}</li>
                <li>Velocidade: ${data.stats[5] ? data.stats[5].base_stat : "N/A"}</li>
            </ul>
        `;

    }catch(e){
        pokemonDataDiv.innerHTML = `<p style="color: red;">${e.message}</p>`;
    }
}