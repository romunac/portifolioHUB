import random
import time

print("=== Adivinhe o Número ===")
print("Estou pensando em um número de 1 a 100...")
time.sleep(1)

numero_secreto = random.randint(1, 100)
tentativas = 0

while True:
    palpite = int(input("Digite seu palpite: "))
    tentativas += 1

    if palpite < numero_secreto:
        print("Muito baixo!")
    elif palpite > numero_secreto:
        print("Muito alto!")
    else:
        print(f"\nParabéns! Você acertou o número {numero_secreto}!")
        print(f"Você precisou de {tentativas} tentativas.")
        break
