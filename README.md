# Interactive Bézier Rope Simulation

An interactive cubic Bézier curve simulation that behaves like a springy rope, responding dynamically to user input (mouse drag).

Built entirely with **HTML, CSS, and Vanilla JavaScript**, this project demonstrates real-time rendering, basic physics, and mathematical precision — all implemented manually without external libraries.
---

## Project Overview

This project visualizes how a Bézier curve can move, bend, and settle like a flexible rope under spring-damping forces. By dragging the yellow control points, the user can observe the curve stretch and oscillate before returning to rest, showcasing the synthesis of geometry and physics in a real-time environment.

### Core Features
* **Cubic Bézier Curve:** Manual implementation of the standard cubic Bézier formula.
* **Spring-Damping Physics:** Creates realistic, elastic motion for the dynamic control points $P_1$ and $P_2$.
* **Tangent Visualization:** Displays tangent lines computed via the derivative to show the curve's direction.
* **Smooth 60 FPS Rendering:** Uses `requestAnimationFrame` for fluid, high-performance animation.
* **Interactive Dragging:** Control points can be clicked and moved with the mouse, setting the physics target.

---

## Mathematical Implementation

### 1️⃣ Bézier Curve Equation: $B(t)$

The position of any point $B(t)$ on the curve is determined by the four control points ($P_0, P_1, P_2, P_3$) and the parameter $t \in [0, 1]$. 

$$B(t) = (1-t)^3P_0 + 3(1-t)^2tP_1 + 3(1-t)t^2P_2 + t^3P_3$$

| Point | Role | Status |
| :--- | :--- | :--- |
| **$P_0$** | Start point | Fixed Endpoint |
| **$P_1$** | Control point 1 | Dynamic (Spring-Damped) |
| **$P_2$** | Control point 2 | Dynamic (Spring-Damped) |
| **$P_3$** | End point | Fixed Endpoint |

### 🧩 Behind the Math — How It Works Visually

To help you visualize the geometry and math behind the Bézier curve:

🎯 **1. Control Points and Path**

P0 ●------● P1

● P2------● P3

The curve always starts at $P_0$ and ends at $P_3$.
$P_1$ and $P_2$ act like magnets pulling the rope toward them.
The closer $t$ is to a control point, the more influence that point has.

🧭 **2. Linear Interpolation (Step by Step)** 
To compute a point on the Bézier curve, we blend control points step by step using linear interpolation (LERP).

1️⃣ **First, draw lines between control points:**
P0 ●────● P1 A P1 ●────● P2 B P2 ●────● P3 C

2️⃣ **Then interpolate again between A, B, and C:**
A ●────● B ●────● C D E

3️⃣ **Finally, interpolate between D and E — the result is the point B(t) on the curve:**
D ●────● E F (B(t))

Every frame, we compute hundreds of these tiny points (for $t = 0 \to 1$) and connect them to draw the smooth curve.

### 🧮 3. Tangent Vector (Derivative)

The tangent vector represents the direction of motion along the curve:

$$B'(t)=3(1−t)^2(P_1−P_0) + 6(1−t)t(P_2−P_1) + 3t^2(P_3−P_2)$$

In simple words:

* It’s like drawing a tiny arrow along the curve’s surface.
* Short tangent lines are drawn at $t=0.25, 0.5, 0.75$ to visualize slope changes.

### 2️⃣ Tangent Vector (Derivative): $B'(t)$

The derivative $B'(t)$ calculates the vector representing the instantaneous direction of the curve at parameter $t$. The resulting vector is normalized for consistent length before being visualized as a tangent line.

$$B'(t) = 3(1-t)^2(P_1-P_0) + 6(1-t)t(P_2-P_1) + 3t^2(P_3-P_2)$$

---

##  Physics Model: Spring-Damping System

The curve's flexibility is achieved using the **mass-spring-damper model** applied to the dynamic control points ($P_1$ and $P_2$) on both the $x$ and $y$ axes independently. This process is calculated every frame using Euler integration.

### Motion Equation (Applied Per Axis)
The acceleration ($a$) is calculated based on the spring force (proportional to displacement) and the damping force (proportional to velocity): 
$$\text{acceleration} = -k \cdot (\text{position} - \text{target}) - \text{damping} \cdot \text{velocity}$$

### Physics Constants

These constants were empirically chosen to provide a visually smooth and aesthetically pleasing oscillation, preventing the curve from settling too quickly or oscillating infinitely.

| Parameter | Value (in `script.js`) | Role |
| :--- | :--- | :--- |
| **$k$** (Stiffness) | `0.08` | Determines how strongly the point pulls back towards its `target` position. |
| **Damping** | `0.85` | Reduces velocity over time, controlling oscillation decay to ensure the point settles naturally. |

---

## Technical Structure

| File | Description | Key Components |
| :--- | :--- | :--- |
| **`index.html`** | Sets up the viewport, links files, and hosts the `<canvas>` element. | `<canvas id="canvas">` |
| **`style.css`** | Handles background gradient, text, and full-screen layout. | Background, Canvas, and `.info` box styling. |
| **`script.js`** | Contains the core logic. | **Manual Math Functions** (Bézier, Tangent), **Physics Engine** (`updatePhysics`), and the **Rendering Loop** (`draw`, `animate`). |

---

## Learning Outcomes

Through this project, I learned:

* How cubic Bézier curves are computed mathematically.
* How to apply simple physics equations to create natural motion.
* How to visualize geometry interactively on the HTML5 Canvas.
* How to write structured and optimized animation code.

### -> Technologies Used
* **HTML5 Canvas:** for rendering the curve and graphics.
* **CSS3:** for layout and background styling.

* **Vanilla JavaScript:** for all logic, physics, and animation.

### -> How to Run
1.  **Clone or download** this repository:

    ```bash
    git clone https://github.com/nileshparmar-web/Assignment-Interactive-B-zier-Curve-with-Physics-Sensor-Control
    ```
2.  Open the project folder in VS Code.
3.  Right-click `index.html` → click **“Open with Live Server”** (if you have the extension), or simply double-click the file to open it in your browser.
4.  Drag the yellow points and enjoy the interactive rope animation!

---

##  Conclusion


This project blends mathematics, programming, and physics to create a visually smooth and technically accurate interactive animation. It demonstrates problem-solving skills, creativity, and a solid grasp of geometry and simulation concepts — making it an excellent addition to my portfolio.

