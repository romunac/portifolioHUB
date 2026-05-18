#include <stdio.h>

int main() {
    float num1, num2;
    char operador;
//a calculara ainda e bem simples, ela tera futuras melhorias.
    printf("Digite uma expressao: ");
    scanf("%f %c %f", &num1, &operador, &num2);

    switch(operador) {
        case '+':
            printf("Resultado: %.2f\n", num1 + num2);
            break;
        case '-':
            printf("Resultado: %.2f\n", num1 - num2);
            break;
        case '*':
            printf("Resultado: %.2f\n", num1 * num2);
            break;
        case '/':
            if (num2 != 0)
                printf("Resultado: %.2f\n", num1 / num2);
            else
                printf("Erro: divisao por zero!\n");
            break;
        default:
            printf("Operador invalido!\n");
    }

    return 0;
}
