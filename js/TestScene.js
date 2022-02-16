class TestScene extends BaseScene{


    constructor(stats){
        super(stats,'test');
    }



    create(){
        this.add.rectangle(100,100,100,100,0xffffff);
    }
}