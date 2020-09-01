<?php
/*
Plugin Name: Transformadas
*/

if(!defined('ABSPATH')){
	die;
}
global $juegos_db_version;
$juegos_db_version = '1.0';

function transformadas_install() {
//	global $Transformadas_db_version;


//	require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

//	add_option( 'juegos_db_version', $juegos_db_version );
}

function transformadas_uninstall() {
	
}


register_activation_hook( __FILE__, 'transformadas_install' );
//register_activation_hook( __FILE__, 'juegos_install_data' );
register_deactivation_hook( __FILE__, 'transformadas_uninstall' );
register_uninstall_hook( __FILE__, 'transformadas_uninstall' );
////////////////////

add_action('wp_enqueue_scripts','transformadas_init');

function transformadas_init() {    

    if ( is_page( 'transformadas' ) ) {
    	wp_enqueue_script( 'phaser', plugins_url( '/js/phaser.min.js', __FILE__ ));
    	wp_enqueue_style( 'transformadas', plugins_url( '/transformadas.css', __FILE__ ));
    	
    	wp_enqueue_script( 'main', plugins_url( '/js/main.js', __FILE__ ));
        wp_enqueue_script( 'sceneMain', plugins_url( '/js/scenes/sceneMain.js', __FILE__ ));
        wp_enqueue_script( 'sceneTitle', plugins_url( '/js/scenes/sceneTitle.js', __FILE__ ));
        wp_enqueue_script( 'sceneOver', plugins_url( '/js/scenes/sceneOver.js', __FILE__ ));
        wp_enqueue_script( 'sceneLoad', plugins_url( '/js/scenes/sceneLoad.js', __FILE__ ));
        wp_enqueue_script( 'model', plugins_url( '/js/classes/mc/model.js', __FILE__ ));
        wp_enqueue_script( 'constants', plugins_url( '/js/constants.js', __FILE__ ));
        wp_enqueue_script( 'controller', plugins_url( '/js/classes/mc/controller.js', __FILE__ ));
        wp_enqueue_script( 'scoreBox', plugins_url( '/js/classes/comps/scoreBox.js', __FILE__ ));
        wp_enqueue_script( 'bar', plugins_url( '/js/classes/comps/bar.js', __FILE__ ));
        wp_enqueue_script( 'card', plugins_url( '/js/classes/comps/card.js', __FILE__ ));
        wp_enqueue_script( 'cardContainer', plugins_url( '/js/classes/comps/cardContainer.js', __FILE__ ));
        wp_enqueue_script( 'cardDeck', plugins_url( '/js/classes/comps/cardDeck.js', __FILE__ ));
        wp_enqueue_script( 'GameGrid', plugins_url( '/js/classes/comps/GameGrid.js', __FILE__ ));
        
        wp_enqueue_script( 'alignGrid', plugins_url( '/js/classes/util/alignGrid.js', __FILE__ ));
        wp_enqueue_script( 'align', plugins_url( '/js/classes/util/align.js', __FILE__ ));
        wp_enqueue_script( 'mediaManager', plugins_url( '/js/classes/util/mediaManager.js', __FILE__ ));
        wp_enqueue_script( 'transform', plugins_url( '/js/classes/util/transform.js', __FILE__ ));
        wp_enqueue_script( 'flatButton', plugins_url( '/js/classes/ui/flatButton.js', __FILE__ ));
        wp_enqueue_script( 'toggleButton', plugins_url( '/js/classes/ui/toggleButton.js', __FILE__ ));
        wp_enqueue_script( 'soundButtons', plugins_url( '/js/classes/ui/soundButtons.js', __FILE__ ));
    	
    	$script_data = array(
            'plugin_path' => WP_PLUGIN_URL . '/transformadas/'
        );
        wp_localize_script(
            'sceneLoad',
            'wpa_data',
            $script_data
        );
    }
}