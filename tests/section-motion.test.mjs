import test from 'node:test';
import assert from 'node:assert/strict';
import { workflowProgress, followPosition, layoutChanged } from '../src/section-motion-model.mjs';
test('workflow enters, crosses all four stages and exits without overshoot', () => {
 const values = [-100, 0, 100, 350, 650, 1000, 1400].map(y => workflowProgress(y, 80, 80, 1000));
 assert.deepEqual(values, [0, 0, .1, .35, .65, 1, 1]);
 assert.deepEqual([0,.333,.666,1].map(p => Math.round(p * 3) + 1), [1,2,3,4]);
});
test('motion follows continuously in both directions without crossing its target', () => {
 let x = 0;
 for(let i=0;i<60;i++){ const next=followPosition(x,950,16.67);assert.ok(next>=x&&next<=950);x=next; }
 assert.ok(950-x<.1);
 for(let i=0;i<60;i++){ const next=followPosition(x,0,16.67);assert.ok(next<=x&&next>=0);x=next; }
 assert.ok(x<.1);
});
test('interpolation is independent of frame rate', () => {
 let slow=0,fast=0;
 for(let i=0;i<10;i++)slow=followPosition(slow,500,32);
 for(let i=0;i<20;i++)fast=followPosition(fast,500,16);
 assert.ok(Math.abs(slow-fast)<1e-8);
});
test('browser-toolbar height changes alone do not rebuild the scene', () => {
 const a={width:390,height:700,nav:80,head:140,foot:64,innerHeight:700};
 assert.equal(layoutChanged(a,{...a,innerHeight:780}),false);
 assert.equal(layoutChanged(a,{...a,width:844,height:390}),true);
 assert.equal(layoutChanged(a,{...a,head:165}),true);
});
