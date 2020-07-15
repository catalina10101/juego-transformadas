class Transform {

    static ReflectXAxis(sprite){
        this.tweens.add({targets: sprite,duration: 2000, 
            scaleX: sprite.scaleX * -1
        });
    }

    static ReflectYAxis(sprite){
        this.tweens.add({targets: sprite,duration: 2000, 
            scaleY: sprite.scaleY * -1
        });
    }

    static Rotate(scene, sprite, angle){
        scene.tweens.add({targets: sprite,duration: 2000, 
            angle: sprite.angle -angle
        });
    }

    static Scale(sprite, scale){
        this.tweens.add({targets: sprite,duration: 2000, 
            scale: scale
        });
    }

    static TranslateInGrid(sprite, xx, yy, grid){
        grid.TranslateObj(sprite, xx, yy); 
    }

    static transform(sprite, params){        
        let config = {targets: sprite,duration: 2000};
        params.forEach(x => {
            config[x.param] = x.value;
        });
        console.log(config);
        this.tweens.add(config);
    }
}