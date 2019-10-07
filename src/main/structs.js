export default {
    layout: {
        props: {
            father: null,
            preview: Boolean,

            cascate: {
                default: ""
            }
        },
        data: function () {
            return {
                config: {
                    card1: null,
                    card2: null
                },
                card1: 'dash-card-add',
                card2: 'dash-card-add',
                card1_deleted: false,
                card2_deleted: false,
            }
        },
        methods: {
            remove(card) {
                if (card.indexOf("card1") > -1) {
                    this.$refs.card2.copy();
                    this.father.paste();
                } else if (card.indexOf("card2") > -1) {
                    this.$refs.card1.copy();
                    this.father.paste();
                }
                // this.empty();
            },
            empty() {
                // if (this.card1_deleted && this.card2_deleted) this.father.paste();
                // if(this.card1_deleted ){
                //     if(this.card2.indexOf("dash-card")>-1){
                //         this.$refs.card2.cut();
                //         this.father.paste();
                //     }
                // }
                // else if(this.card2_deleted ){
                //     if(this.card1.indexOf("dash-card")>-1){
                //         this.$refs.card1.cut();
                //         this.father.paste();
                //     }
                // }
                // if (this.card1_deleted && this.card2_deleted) this.father.remove();
            },
            setConfig(cfg, card, onload) {
                this.config[card] = cfg;
                this.father.setConfig(this.config, onload);
            },
            onPageJoin: function () {
                this.$refs.card1.onPageJoin();
                this.$refs.card2.onPageJoin();
            },
            onPageLeave: function () {
                this.$refs.card1.onPageLeave();
                this.$refs.card2.onPageLeave();
            },
            load(cfg) {
                if (cfg != null) {
                    this.config.card1 = cfg.card1;
                    this.config.card2 = cfg.card2;
                    this.$refs.card1.load(cfg.card1);
                    this.$refs.card2.load(cfg.card2);
                } else {
                    this.card1 = "dash-card-add'";
                    this.card2 = "dash-card-add'";
                    this.config.card1 = null;
                    this.config.card2 = null;
                }
            },
        }
    },
    component: {
        props: {
            father: Object,
        },
        methods: {
            setLayout(sizer) {
                return sizer;
            },
            edit(attr) {
                this.$parent.edit(attr);
            },
            start() {},
            end() {},
            refresh() {}
        }
    }
}