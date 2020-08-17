<!DOCTYPE html>
    <head>
        <title>Hello PHP World!</title>
    </head> 
    <body>
        <?php echo '<h1>Hello PHP World!</h1>' . '<br>'?>
        <?php echo 'This page was generated using PHP.' . '<br>'?>
        <?php echo 'Time Generated: ' . date("Y-m-d h:i:sa") . '<br>' ?>
        <?php echo 'Your IP address: ' . getenv("REMOTE_ADDR") ?>
    </body>
</html>