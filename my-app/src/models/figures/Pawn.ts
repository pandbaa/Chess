import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/black-pawn.png";
import whiteLogo from "../../assets/white-pawn.png";

export class Pawn extends Figure {
  isFirstStep: boolean = true;
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.PAWN;
  }
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;
    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
    const firstStepDirection =
      this.cell.figure?.color === Colors.BLACK ? 2 : -2;

    if (
      (target.y === this.cell.y + direction || //проверка на то, чтобы смещение происходила на 1 по Оу
        (this.isFirstStep && target.y === this.cell.y + firstStepDirection)) && //проверка на то, чтобы смещение происходила на 2 по Оу, если это первый щаг фигуры
      target.x === this.cell.x && //проверка на то, что фигура не перепрыгивает в другой столбец
      this.cell.board.getCell(target.x, target.y).isEmpty() //проверка на пустоту ячейки, куда хотим попасть
    )
      return true;

    if (
      target.y === this.cell.y + direction && //проверка на сдвиг на 1 по Оу вверх/вниз для разных цветов
      (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) && //проверка на то, чтобы смещение происходила на 1 по Ох
      this.cell.isEnemy(target) //проверка на то, стоит ли враг
    )
      return true;
    return false;
  }
  moveFigure(target: Cell): void {
    super.moveFigure(target);
    this.isFirstStep = false;
  }
}
