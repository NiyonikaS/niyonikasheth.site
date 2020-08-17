<!DOCTYPE html>
    <head>
        <title>Hello PHP World (JSON)</title>
    </head> 
    <body>
        <?php 
        $myObj = array("Message"=> "Hello PHP World using JSON!", "Today's Date"=> date("Y-m-d h:i:sa"), "Your IP Address"=> getenv("REMOTE_ADDR"));

        $myJSON = json_encode($myObj);

        echo $myJSON;
        ?>
    </body>
</html>