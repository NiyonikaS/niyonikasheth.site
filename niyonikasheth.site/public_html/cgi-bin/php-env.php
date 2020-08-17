<!DOCTYPE html>
    <head>
        <title>PHP Environment</title>
    </head> 
    <body>

        <?php
            $env_vars = getenv();
            $ser_vars = $_SERVER;

            echo '<h2>Environment Variables</h2><ul>';
            foreach ($env_vars as $key=>$value){
                echo "<li> <strong>$key:</strong>  $value</li>";
            }
            echo '</ul>';


            echo '<h2>Server Variables</h2><ul>';

            foreach ($ser_vars as $key=>$value){
                echo "<li> <strong>$key:</strong>  $value</li>";
            }
            echo '</ul>';

        ?>

        </body>
</html>