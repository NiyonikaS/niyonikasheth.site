<!DOCTYPE html>
    <head>
        <title>PHP General Echo</title>
    </head> 
    <body>
        <h1> General Request Echo </h1>
        <?php
        $method = $_SERVER['REQUEST_METHOD'];
        $protocol = $_SERVER['SERVER_PROTOCOL'];
        $query = $_GET;
        $body = $_POST;
        echo "<p><strong>Request Method:</strong> $method</p>";
        echo "<p><strong>Protocol:</strong> $protocol</p>";
        echo "<p><strong>Query:</strong></p><ul>";
        foreach ($query as $key=>$value){
            echo "<li><strong>$key:</strong> $value</li>";
        }
        echo '</ul>';
        echo "<p><strong>Message Body:</strong></p><ul>";
        foreach ($body as $key=>$value){
            echo "<li><strong>$key:</strong> $value</li>";
        }
        ?>
    </body>
</html>