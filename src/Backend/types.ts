export type BoardGame = {
    title: string;
    category: string;
    released_year: number;
    designer: string[];
    artist?: string[];
    vote_average: number;
    description?: string;
    min_players: number;
    max_players: number;
    playtime?: number;
    min_age?: number;
    image: string;
    link: string;
    owner?: string;
};

export type VideoGame = {
    title: string;
    category: string;
    released_year: number;
    publisher: string;
    game_studio: string;
    vote_average: number;
    description: string;
    image: string;
    link: string;
    owner?: string;
};