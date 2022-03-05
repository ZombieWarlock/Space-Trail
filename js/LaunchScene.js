class LaunchScene extends Phaser.Scene{

    /**
     * 
     * @param {Object} stats Pass the global stats objects through 
     */
    constructor(stats){
        super({key:'launch scene'});
        this.key = 'launch scene';
        this.stats = stats;
    }

    preload(){
        /*
        Load needed assets here
        */ 
       

        this.objects = {};


    }

    create(){
        let obj = this.objects;
        const GAME_HEIGHT = this.sys.game.config.height;
        const GAME_WIDTH = this.sys.game.config.width; 

        const MAX_RESOURCE = 10;

        const MAX_SUM_RESOURCE = 30; //Max num of resources, when all resources are summed up

        const sum = arr =>{
            let x=0;
            arr.forEach(element => {
                x+=element;
            });
            return x;
        };



        //Adds background for stats buttons
        obj.backRect = this.add.rectangle(GAME_WIDTH/2,GAME_HEIGHT/2,GAME_WIDTH/1.4,GAME_HEIGHT/2,0x23d5f1);

        //First stat's rectangle x coord
        let first_stat_x = obj.backRect.x - obj.backRect.x/1.8;
        const DIST_BTWN_STATS = obj.backRect.width/5.2;
        obj.tool_rects = [];
        
        //Generates rectangles for all stats
        //THIS IS MEANT TO BE CHANGED LATER
        //whether that be the colors, this is only a basic layout
        for (let i = 1; i <= Object.keys(this.stats.resources).length; i++) {
            obj.tool_rects.push(this.add.rectangle(first_stat_x,obj.backRect.y+(obj.backRect.height/3.5),obj.backRect.width/5.3,obj.backRect.height/3,0xffffff));
            
            first_stat_x+= DIST_BTWN_STATS;
        }

        let stats_buttons = {}; //Array of OnClicks for the stats buttons
        //Makes the stats buttons

        first_stat_x = obj.backRect.x - obj.backRect.x/1.8;
        for (const key in this.stats.resources) {
            

            //onClick Functions
            let plus = ()=>{
                if(this.stats.resources[key]>=MAX_RESOURCE){return;}//Stops if it's at MAX_RESOURCE
                if(sum(Object.values(this.stats.resources))+1>MAX_SUM_RESOURCE){return;}//Stops if the sum of all resources is at MAX_SUM_RESOURCE
                this.stats.resources[key]++;
                stats_buttons[key].resourcelabel.setText(key)
                stats_buttons[key].resourcecount.setText(this.stats.resources[key])
            };

            let minus = ()=>{
                if(this.stats.resources[key]<=1){return;}
                this.stats.resources[key]--;
                stats_buttons[key].resourcelabel.setText(key)
                stats_buttons[key].resourcecount.setText(this.stats.resources[key])

            };

            
            //Makes the label, plus and minus buttons 
            stats_buttons[key] = {

                resourcelabel:this.add.text(first_stat_x,obj.backRect.y-obj.backRect.height/2+20,key,{font:'20px',color:'#487D9E'}).setOrigin(.5,.5),
                resourcecount:this.add.text(first_stat_x,obj.tool_rects[0].y-25,this.stats.resources[key],{font:'25px',color:'#487D9E'}).setOrigin(.5,.5),
                plus:createButton(first_stat_x,obj.tool_rects[0].y+3,'ADD',this,plus,null,'20px Comic Sans'),
                minus:createButton(first_stat_x,obj.tool_rects[0].y+28,'REMOVE',this,minus,null,'20px Comic Sans'),

            }

            //Increments each tools' x coord
            first_stat_x+=DIST_BTWN_STATS;
        }


        obj.next_turn_btn = createButton(
            GAME_WIDTH*(27/33.3),
            GAME_HEIGHT*(23/25),
            'NEXT',
            this,
            ()=>{
                this.scene.start(new UIScene().key,this.stats);
            },
        );


 


        
    }


}