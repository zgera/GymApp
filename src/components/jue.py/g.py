import pygame
import time
import random

# Inicializar Pygame
pygame.init()

# Colores
NEGRO = (0, 0, 0)
BLANCO = (255, 255, 255)
VERDE = (0, 255, 0)
ROJO = (255, 0, 0)
AZUL_CLARO = (173, 216, 230)
CELESTE = (135, 206, 250)

# Configuración de la pantalla
ANCHO = 800
ALTO = 600
TAM_CELDA = 20
FPS = 10

pantalla = pygame.display.set_mode((ANCHO, ALTO))
pygame.display.set_caption('Snake Game')
clock = pygame.time.Clock()

# Fuente
fuente = pygame.font.SysFont(None, 35)

def mostrar_mensaje(msg, color):
    texto = fuente.render(msg, True, color)
    pantalla.blit(texto, [ANCHO / 6, ALTO / 3])

def juego():
    juego_terminado = False
    juego_cerrado = False

    # Definir serpiente

    comida = pygame.image.load(c:\Users\Usuario\Downloads\images.png)
    comida = comida_x, comida_y
    # Posición inicial de la serpiente
    x_serpiente = ANCHO / 2
    y_serpiente = ALTO / 2
    x_cambio = 0
    y_cambio = 0

    # Cuerpo de la serpiente
    serpiente_lista = []
    longitud_serpiente = 1

    # Posición inicial de la comida
    com_x = round(random.randrange(0, ANCHO - TAM_CELDA) / 20.0) * 20.0
    com_y = round(random.randrange(0, ALTO - TAM_CELDA) / 20.0) * 20.0
    for segmento in serpiente_lista[:-1]:
        while segmento == com_x and segmento == com_y:
            com_x = round(random.randrange(0, ANCHO - TAM_CELDA) / 20.0) * 20.0
            com_y = round(random.randrange(0, ALTO - TAM_CELDA) / 20.0) * 20.0
    comida_x = com_x
    comida_y = com_y


    while not juego_terminado:

        while juego_cerrado:
            pantalla.fill(NEGRO)
            mostrar_mensaje("Perdiste! Presiona Q para salir o C para jugar de nuevo", ROJO)
            pygame.display.update()

            for evento in pygame.event.get():
                if evento.type == pygame.KEYDOWN:
                    if evento.key == pygame.K_q:
                        pygame.quit()
                        quit()
                    if evento.key == pygame.K_c:
                        juego()
        
        for evento in pygame.event.get():
            if evento.type == pygame.QUIT:
                pygame.quit()
                quit()
            if evento.type == pygame.KEYDOWN:
                if evento.key == pygame.K_LEFT:
                    x_cambio = -TAM_CELDA
                    y_cambio = 0
                elif evento.key == pygame.K_RIGHT:
                    x_cambio = TAM_CELDA
                    y_cambio = 0
                elif evento.key == pygame.K_UP:
                    y_cambio = -TAM_CELDA
                    x_cambio = 0
                elif evento.key == pygame.K_DOWN:
                    y_cambio = TAM_CELDA
                    x_cambio = 0
        
        # Verificar si la serpiente se sale de la pantalla
        if x_serpiente >= ANCHO or x_serpiente < 0 or y_serpiente >= ALTO or y_serpiente < 0:
            juego_cerrado = True
        
        x_serpiente += x_cambio
        y_serpiente += y_cambio
        pantalla.fill(NEGRO)

        pygame.draw.rect(pantalla,ROJO , [comida_x, comida_y, TAM_CELDA, TAM_CELDA])
        
        # Movimiento de la serpiente
        cabeza_serpiente = []
        cabeza_serpiente.append(x_serpiente)
        cabeza_serpiente.append(y_serpiente)
        serpiente_lista.append(cabeza_serpiente)
        
        if len(serpiente_lista) > longitud_serpiente:
            del serpiente_lista[0]

        for segmento in serpiente_lista[:-1]:
            if segmento == cabeza_serpiente:
                juego_cerrado = True

        for segmento in serpiente_lista:
            pygame.draw.rect(pantalla, AZUL_CLARO, [segmento[0], segmento[1], TAM_CELDA, TAM_CELDA])
        
        pygame.display.update()

        if x_serpiente == comida_x and y_serpiente == comida_y:
            comida_x = round(random.randrange(0, ANCHO - TAM_CELDA) / 20.0) * 20.0
            comida_y = round(random.randrange(0, ALTO - TAM_CELDA) / 20.0) * 20.0
            longitud_serpiente += 1
        
        clock.tick(FPS)

    pygame.quit()
    quit()

juego()