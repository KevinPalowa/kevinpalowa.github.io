const renderStanding = (e) => {
    const standing = $('#standing tbody');
    let list = ``;
    e.standings[0].table.forEach((club, index) => {
        index++
        const html = `
        <tr>
            <td>${index}</td>
            <td>
                    <div class="club" data-id="${club.team.id}">
                        <img class="club-logo"
                        src="${club.team.crestUrl}" alt="">
                        ${club.team.name}
                    </div>
            </td>
            <td>${club.playedGames}</td>
            <td>${club.won}</td>
            <td>${club.draw}</td>
            <td>${club.lost}</td>
            <td>${club.goalsFor}</td>
            <td>${club.goalsAgainst}</td>
            <td>${club.goalDifference}</td>
            <td>${club.points}</td>
            `
        index++;
        dbGetId(club.team.id).then(() => {
            list += `${html}<td><i data-id="${club.team.id}"  data-name="${club.team.name}" data-img="${club.team.crestUrl}"  class="fav material-icons">star</i></td>
            </tr>`;
        }).catch(err => {
            list += `${html}<td><i data-id="${club.team.id}" data-name="${club.team.name}" data-img="${club.team.crestUrl}" class="fav material-icons">star_border</i></td>
            </tr> `;
        });

    });
    setTimeout(() => {
        standing.append(list);
        $('#leagueName').text(e.competition.name);
        $('.preloader-wrapper').remove();
        $('td:last-child').click(function () {
            const icon = $(this).children();
            const data = {
                id: icon.data('id'),
                name: icon.data('name'),
                crestUrl: icon.data('img'),
            }
            const toastHTML = '<span>Added to favorites!</span><button class="btn-flat red-text toast-action">Undo</button>';
            if (icon.text() == 'star') {
                icon.html('star_border');
                dbDelete(icon.data('id'));
                M.toast({
                    html: '<span>Remove Favorites</span><button class="btn-flat red-text toast-action">Undo</button>'
                });
                $('.toast-action').click(function () {
                    dbInsert(data);
                    icon.html('star');
                })
            } else {
                icon.html('star');
                dbInsert(data);
                M.toast({
                    html: toastHTML
                });
                $('.toast-action').click(function () {
                    dbDelete(icon.data('id'));
                    icon.html('star_border');
                });
            }

        });
    }, 1000);


}

const renderAllFav = () => {
    dbGetall().then(res => {
        let list = "";
        res.forEach(r => {
            list += ` 
        <li class="collection-item avatar">
        <img src="${r.crestUrl}" alt="${r.name}" class="circle">
        <p class="title">${r.name}</p>
        <i class="material-icons secondary-content close" data-id="${r.id}">close</i>
        </li>
    `;
        });
        $('.collection').html(list);
        $('.material-icons').click(function () {
            dbDelete($(this).data('id')).then(() => {
                renderAllFav();
            });
            M.toast({
                html: '<span>Remove Favorites</span>'
            });
        })

    }).catch(err => {
        $('.collection').html(` <li class="collection-item">
        <h5 class="center">${err}</h5>
        </li>`);
    });
}

const loadNav = async () => {
    const res = await fetch('/nav.html');
    return res.text();
}

const loadPage = page => {
    const content = $('.body-content');
    fetch(`/pages/${page}.html`).then(r => {
        if (!r.ok) {
            throw new Error("Page not found!");
        }
        return r.text();
    }).then(r => {
        content.html(r);


        switch (page) {
            case 'home':
                $('a.favorites').click(function () {
                    loadPage($(this).attr('href').substr(1));
                });
                getStanding(2021).then(r => {
                    renderStanding(r);
                })

                break;
            case 'favorites':
                renderAllFav();

                break;
            case 'scheduled':
                getScheduled().then(res => {
                    renderScheduled(res);
                })
                break;
            default:
                break;
        }


    }).catch(r => {
        content.html(`<div class="container-valign-wrapper">
        <h1 class="center">${r}</h1>
        </div>`);
    })
}

const renderScheduled = data => {
    let html = "";
    if (data.count > 0) {
        data.matches.forEach(a => {
            html += `<li class="scheduled collection-item">
            <div class="team-a">
                <p id='team-a'>${a.homeTeam.name}</p>
            </div>
            <div class="vs">
                <h5 class="orange-text darken-3">VS</h5>
            </div>
            <div class="team-b">
                <p id="team-b">${a.awayTeam.name}</p>
            </div>
        </li>`;
        })
    } else {
        html += `<li class="collection-item"><h5 class="center">No schedule</h5></li>`;
    }
    $('.collection').html(html);
}