class Transform {

    static ReflectXAxis(scene, sprite){
        scene.tweens.add({targets: sprite,duration: G.TWEEN_TIME, 
            scaleY: sprite.scaleY * -1,
            y: -sprite.y,            
        });
    }

    static ReflectYAxis(scene, sprite){
        scene.tweens.add({targets: sprite,duration: G.TWEEN_TIME,             
            scaleX: sprite.scaleX * -1,
            x: -sprite.x,
        });
    }

    static Rotate(scene, sprite, angle){
        let newAngle = sprite.angle -angle;       
        scene.tweens.add({targets: sprite,duration: G.TWEEN_TIME, 
            angle: newAngle
        });
        scene.time.addEvent({ delay: G.TWEEN_TIME+10, callback: Transform.rotationFinished
            , args:[sprite, newAngle], callbackScope: null, loop: false });        
    }

    static rotationFinished(sprite, newAngle){
        sprite.angle = newAngle;
    }

    static Scale(scene, sprite, scale, time){
        scene.tweens.add({targets: sprite,duration: time, 
            scale: scale
        });
    }

    static TranslateInGrid(sprite, xx, yy, grid){
        grid.TranslateObj(sprite, xx, yy); 
    }

    static transform(sprite, params){        
        let config = {targets: sprite,duration: G.TWEEN_TIME};
        params.forEach(x => {
            config[x.param] = x.value;
        });
        console.log(config);
        scene.tweens.add(config);
    }

    static memeCatched(scene, memeSprite, player){
        scene.tweens.add({targets: memeSprite,duration: G.TWEEN_TIME, 
            scale: 0,
            angle: memeSprite.angle -360
        });
        const prevScale = player.scale;
        player.scale = 0;
        scene.time.addEvent({ delay: G.TWEEN_TIME+10, callback: Transform.memeCatchedAnimFinished, args:[scene, memeSprite, player, prevScale], callbackScope: null, loop: false });        
    }

    static memeCatchedAnimFinished(scene, memeSprite, player, prevScale){       
        Transform.Scale(scene, player, prevScale, G.TWEEN_TIME);
        //memeSprite.destroy();
    }
}