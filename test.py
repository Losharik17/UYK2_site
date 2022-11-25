from math import sqrt

a = float(input())
b = float(input())
c = float(input())

if a == b == c == 0:
    print('Infinite solutions')
else:
    disc = b ** 2 - 4 * a * c
    if disc < 0:
        print('No solution')
    elif disc == 0:
        if a != 0:
            x1 = -b / (2 * a)
            if x1 == 0:
                x1 = abs(x1)
            print(f'{x1:.2f}')
        else:
            if b != 0:
                x1 = -c / b
                if x1 == 0:
                    x1 = abs(x1)
                print(f'{x1:.2f}')
            else:
                print('No solution')
    else:
        if a != 0:
            x1 = (-b + sqrt(disc)) / (2 * a)
            x2 = (-b - sqrt(disc)) / (2 * a)

            if x1 == 0:
                x1 = abs(x1)
            if x2 == 0:
                x2 = abs(x2)

            mas = [f'{x1:.2f}', f'{x2:.2f}']

            for i in range(len(mas)):
                mas[i] = float(mas[i])

            mas.sort()
            print(*mas)
        else:
            if b != 0:
                x1 = -c / b
                if x1 == 0:
                    x1 = abs(x1)
                print(f'{x1:.2f}')
            else:
                print('No solution')
