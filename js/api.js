const token = '8b4acfe548bb4a7087546a5464d2a00d'
const url = 'https://api.football-data.org/v2/'

const getData = async (url) => {
    const res = await fetch(url, {
        headers: {
            'X-Auth-Token': token
        }
    })
    return res.json()
}

const getStanding = async (id) => {
    return getData(`${url}competitions/${id}/standings`)
}

const getDetailClub = async (id) => {
    return getData(`${url}teams/${id}`);
}

const getScheduled = async () => {
    return getData(`${url}competitions/2021/matches?status=SCHEDULED`)
}