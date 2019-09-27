export default {
    theme: {
        primary: '#424242',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#ff4444',
        info: '#33b5e5',
        success: '#00C851',
        warning: '#ffbb33'
    },
    header: {
        'X-CSRF-TOKEN': "",
    },
    models: {
        tabs_cards: [{
            text: 'Layouts',
            cards: [{
                    layout: 'dash-layout-1x2',
                    content: 'Dividir verticalmente',
                    rotate: "90",
                    icon: "view_agenda"
                },
                {
                    layout: 'dash-layout-2x1',
                    content: 'Dividir horizontalmente',
                    rotate: "0",
                    icon: "view_agenda"
                },
            ]
        }, {
            text: 'Cartões',
            cards: [{
                    layout: 'dash-card-carrosel',
                    content: 'Carrosel de imagens',
                    rotate: "90",
                    icon: "view_day"
                },
                {
                    layout: 'dash-card-image',
                    content: 'Imagem com texto',
                    rotate: "0",
                    icon: "image"
                },
                {
                    layout: 'dash-card-birthday',
                    content: 'Aniversariante do mês',
                    rotate: "0",
                    icon: "date_range"
                },
                {
                    layout: 'dash-card-survey',
                    content: 'Enquete',
                    rotate: "0",
                    icon: "list"
                },
                {
                    layout: 'dash-card-feed',
                    content: 'Feed de notícia',
                    rotate: "0",
                    icon: "chrome_reader_mode"
                },
                {
                    layout: 'dash-card-video',
                    content: 'Vídeo',
                    rotate: "0",
                    icon: "play_arrow"
                }
            ]
        }, ]
    }
}