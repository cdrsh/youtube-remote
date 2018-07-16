REM Make CA (Certificate Authority)

REM make root key
openssl genrsa -out rootCA.key 2048

REM make root cetrificate
openssl req -x509 -new -key rootCA.key -days 10000 -out rootCA.crt

REM make certificate signed by us CA

REM geneate key
openssl genrsa -out ytchanger.key 2048

REM make certificate request with key
REM set server name domain or IP
REM Common Name ytchanger
openssl req -new -key ytchanger.key -out ytchanger.csr

REM sign cetrificate request by us root cetrificate
openssl x509 -req -in ytchanger.csr -CA rootCA.crt -CAkey rootCA.key -CAcreateserial -out ytchanger.crt -days 5000

REM for public
REM rootCA.crt

REM for private
REM rootCA.key
