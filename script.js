const RSS_URL = `https://revolutionspodcast.libsyn.com/rss`;

const seasons = [
  [], // Season 1
  [], // Season 2
  [], // Season 3
  [], // Season 4
  [], // Season 5
  [], // Season 6
  [], // Season 7
  [], // Season 8
  [], // Season 9
  [], // Season 10
  [], // Other
];

let S1 = seasons[0],
  S2 = seasons[1],
  S3 = seasons[2],
  S4 = seasons[3],
  S5 = seasons[4],
  S6 = seasons[5],
  S7 = seasons[6],
  S8 = seasons[7],
  S9 = seasons[8],
  S10 = seasons[9],
  SS = seasons[10];

fetch(RSS_URL)
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    const items = data.querySelectorAll("item");
    items.forEach(item => {

      // Construct an object out of each item
      let date = new Date(item.querySelector("pubDate").innerHTML);
      let episode = {
        title: item.querySelector("title").innerHTML,
        date: date.toDateString(),
        link: item.querySelector("link").lastChild.data,
        // Clean descriptions
        description: item.querySelector("description").lastChild.data.replace(/(<([^>]+)>)/ig, '')
      }

      // Place into the correct chapter list
      // if title matches a number, add to corresponding array
      if (episode.title.includes("1.")) {
        S1.unshift(episode);
      } else if (episode.title.includes("2.")) {
        S2.unshift(episode);
      } else if (episode.title.includes("3.")) {
        S3.unshift(episode);
      } else if (episode.title.includes("4.")) {
        S4.unshift(episode);
      } else if (episode.title.includes("5.")) {
        S5.unshift(episode);
      } else if (episode.title.includes("6.")) {
        S6.unshift(episode);
      } else if (episode.title.includes("7.")) {
        S7.unshift(episode);
      } else if (episode.title.includes("8.")) {
        S8.unshift(episode);
      } else if (episode.title.includes("9.")) {
        S9.unshift(episode);
      } else if (episode.title.includes("10.")) {
        S10.unshift(episode);
      } else {
        SS.unshift(episode);
      }

    });

    createSeason('EnglishCivilWar', S1)
    createSeason('AmericanRevolution', S2)
    createSeason('FrenchRevolution', S3)
    createSeason('HaitianRevolution', S4)
    createSeason('SouthAmerican', S5)
    createSeason('JulyRevolition', S6)
    createSeason('1848Revolutions', S7)
    createSeason('ParisCommune', S8)
    createSeason('MexicanRevoltution', S9)
    createSeason('RussianRevolution', S10)
    createSeason('Miscellaneous', SS)
  });


function createSeason(id, season) {
  // Find the right div
  var parent = document.getElementById(id);
  listElement = document.createElement('ul');
  listElement.classList.add("content");
  parent.appendChild(listElement);
  season.forEach(episode => {
    let li = document.createElement('li');
    listElement.appendChild(li);
    li.innerHTML += `
      <article class="episode">
        <span class="ep-title">
          <h5>
            <a href="${episode.link}" target="_blank" rel="noopener">
              ${episode.title}
            </a>
          </h5>
        </span>
        <span class="ep-date">${episode.date}</span>
        <p class="ep-description">${episode.description}</p>
      </article>
    `;
  })
}

const accordion = document.getElementsByClassName('container');

for (i=0; i<accordion.length; i++) {
  accordion[i].addEventListener('click', function () {
    this.classList.toggle('active')
  })
}