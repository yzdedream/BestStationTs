import {Point} from "../model/point";

test('test get distance',()=>{
    const p1 = new Point(0, 0);
    const p2 = new Point(3, 4);
    const distance = p1.getDistance(p2);
    expect(distance).toBe(5);
})
