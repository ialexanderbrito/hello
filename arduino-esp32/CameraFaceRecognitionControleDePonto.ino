
//Viral Science www.youtube.com/c/viralscience  www.viralsciencecreativity.com
//ESP Camera Artificial Intelligence Face Detection


#include "esp_camera.h"
#include <WiFi.h>
#include <FirebaseESP32.h>          //ADICIONANDO BIBLIOTECA DO FIREBASE
#include <NTPClient.h>              //ADICIONANDO BIBLIOTECA DE HORÁRIO :: LINK PARA DOWNLOAD DA BIBLIOTECA: https://github.com/arduino-libraries/NTPClient

// SELECIONE O MODELO DA CÂMERA
//#define CAMERA_MODEL_WROVER_KIT
//#define CAMERA_MODEL_ESP_EYE
//#define CAMERA_MODEL_M5STACK_PSRAM
//#define CAMERA_MODEL_M5STACK_WIDE
#define CAMERA_MODEL_AI_THINKER                                       //DEFININDO MODELO DA CAMERA QUE SERÁ UTILIZADO
#define Relay 2
#define Red 13
#define Green 12

#include "camera_pins.h"

#define FIREBASE_HOST "https://controleponto-50b98.firebaseio.com"    //DEFININDO HOST DO PROJETO DO FIREBASE
#define FIREBASE_AUTH "e0e9X6kUybivlpC63rLRgeNsz9upUFD6NsNS1iBT"      //DEFININDO A CHAVE DE AUTENTICAÇÃO DO PROJETO DO FIREBASE

FirebaseData firebaseData;
FirebaseJson json;


const char* ssid = "Android";                                         //Wifi Name SSID
const char* password = "inra0451";                                    //WIFI Password

void startCameraServer();

//CONFIGURAÇÕES DO SERVIDOR NTP
const char* servidorNTP = "a.st1.ntp.br";                             //SERVIDOR NTP PARA PESQUISA DE HORA
 
const int fusoHorario = -10800;                                       //FUSO HORÁRIO EM SEGUNDOS
const int taxaDeAtualizacao = 1800000;                                //TAXA DE ATUALIZAÇÃO DO SERVIDOR EM MILESEGUNDOS
 
WiFiUDP ntpUDP;                                                       //DECLARAÇÃO DO PROTOCOLO UDP
NTPClient timeClient(ntpUDP, servidorNTP, fusoHorario, 60000);

boolean matchFace = false;
boolean activateRelay = false;
long prevMillis=0;
int interval = 5000;
int sujeito;                                                          //DECLARANDO VARIAVEL DE ID DO FUNCIONARIO
String funcionario;                                                   //DECLARANDO STRING PARA NOME DO FUNCIONÁRIO

void setup() {
  pinMode(Relay,OUTPUT);
  pinMode(Red,OUTPUT);
  pinMode(Green,OUTPUT);
  digitalWrite(Relay,LOW);
  digitalWrite(Red,HIGH);
  digitalWrite(Green,LOW);
  
  Serial.begin(115200);
  Serial.setDebugOutput(true);
  Serial.println();

  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;

  if(psramFound()){
    config.frame_size = FRAMESIZE_UXGA;
    config.jpeg_quality = 10;
    config.fb_count = 2;
  } else {
    config.frame_size = FRAMESIZE_SVGA;
    config.jpeg_quality = 12;
    config.fb_count = 1;
  }

#if defined(CAMERA_MODEL_ESP_EYE)
  pinMode(13, INPUT_PULLUP);
  pinMode(14, INPUT_PULLUP);
#endif

  // camera init
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x", err);
    return;
  }

  sensor_t * s = esp_camera_sensor_get();
 
  if (s->id.PID == OV3660_PID) {
    s->set_vflip(s, 1);
    s->set_brightness(s, 1);
    s->set_saturation(s, -2);
  }

  s->set_framesize(s, FRAMESIZE_QVGA);

#if defined(CAMERA_MODEL_M5STACK_WIDE)
  s->set_vflip(s, 1);
  s->set_hmirror(s, 1);
#endif

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");

  startCameraServer();

  Serial.print("Camera Ready! Use 'http://");
  Serial.print(WiFi.localIP());
  Serial.println("' to connect");

  timeClient.begin();


  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);                           //INICIANDO O FIREBASE
  Firebase.reconnectWiFi(true);                                       
 
  
}

void loop() {

  
  if(matchFace==true && activateRelay==false)
  {

      if(sujeito == 0){                                                   //FAZENDO A VERIFICAÇÃO DO ID DO FUNCIONÁRIO PARA CADASTRAR NO NOME CERTO
        funcionario = "Joedson";
        Serial.println(funcionario);
      }
    
      if(sujeito == 1){                                                   //FAZENDO A VERIFICAÇÃO DO ID DO FUNCIONÁRIO PARA CADASTRAR NO NOME CERTO
        funcionario = "Iuri";
        Serial.println(funcionario);
      }

      if(sujeito == 2){                                                   //FAZENDO A VERIFICAÇÃO DO ID DO FUNCIONÁRIO PARA CADASTRAR NO NOME CERTO
        funcionario = "Alexander";
        Serial.println(funcionario);
      }

    timeClient.update();                                                  //ATUALIZANDO HORÁRIO
    Serial.println(timeClient.getFormattedTime());                        //PRINTANDO NA PORTA SERIAL O HORÁRIO ATUALIZADO
 
    String hora = timeClient.getFormattedTime();                          //ARMAZENANDO O HORÁRIO ATUALIZADO EM UMA VARIÁVEL DO TIPO STRING
    
    activateRelay=true;
    digitalWrite(Relay,HIGH);
    digitalWrite(Green,HIGH);
    digitalWrite(Red,LOW);
    prevMillis=millis();
    Serial.print("SUJEITO = ");
    Serial.println(sujeito);                                              //PRINTANDO NA PORTA SERIAL O ID DO FUNCIONÁRIO RECONHECIDO
    Serial.println("HORÁRIO = ");
    Serial.print(hora);                                                   //PRINTANDO NA PORTA SERIAL O HORÁRIO DE ENTRADA E SAÍDA DO FUNCIONÁRIO
    json.set("/id", sujeito);                                             //ENVIANDO PARA O ARQUIVO JSON O ID DO FUNCIONÁRIO
    Firebase.pushJSON(firebaseData,"/funcionario", json);                 //ENVIANDO PARA O FIREBASE O ID DO FUNCIONÁRIO
    json.set("/nome", funcionario);                                       //ENVIANDO PARA O ARQUIVO JSON O NOME DO FUNCIONÁRIO
    Firebase.pushJSON(firebaseData,"/funcionario", json);                 //ENVIANDO PARA O FIREBASE O NOME DO FUNCIONÁRIO
    json.set("/horario", hora);                                           //ENVIANDO PARA O ARQUIVO JSON O HORÁRIO DE ENTRADA OU SAÍDA DO FUNCIONÁRIO
    Firebase.pushJSON(firebaseData,"/funcionario", json);                 //ENVIANDO PARA O FIREBASE O HORÁRIO DE ENTRADA OU SAÍDA DO FUNCIONÁRIO
    }
    
    
    if (activateRelay == true && millis()-prevMillis > interval)          //QUANDO NÃO FOR DETECTADA A FACE DO FUNCIONÁRIO ELE APAGA O LED VERDE E LIGA O VERMELHO
    {
      activateRelay=false;
      matchFace=false;
      digitalWrite(Relay,LOW);
      digitalWrite(Green,LOW);                                            //DESLIGA O LED VERDE
      }
     
}
