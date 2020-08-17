<!DOCTYPE html>
    <head>
        <title>PHP GET Echo</title>
    </head> 
    <body>
        <h1> Get Request Echo </h1>
        <?php
        $query = $_SERVER['QUERY_STRING'];
        $vars = $_GET;
        echo "<p><strong>Query String:</strong> $query</p><ul>";
        foreach ($vars as $key=>$value){
            echo "<li><strong>$key:</strong> $value</li>";
        }
        echo '</ul>';
        ?>
    </body>
</html>