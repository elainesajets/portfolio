---
title: "Study Log: First day of GameDev.tv's Complete Unity 2D Developer: Design & Develop Games in Unity 6 using C#"
description: 'My first blog post and the start of logging my game development learning journey.'
date: 2025-10-31
tags: [blog, gamedev.tv, studylog, post]
draft: true
---

## Some background

I've recently completed Unity's Junior Programmer Pathway, which gave me a great introduction to Unity and C#. While it was, for the most part, a great program with a fun and engaging teacher, I did find it lacking in some aspects. Firstly, it was quite outdated. Many links led nowhere, and for at least the first half of the course, assignment submissions didn’t work. There was also a lot of reading at certain points, which wasn’t very engaging, and I’m not sure how much of it actually stuck.

It’s important to note that it’s a free course though, and considering that, I think it’s well worth it for anyone interested in trying out Unity.

## GameDev.tv

Doing the Unity course confirmed my interest in game development, so I started looking for other courses to take afterwards. Most forums I read online pointed me towards GameDev.tv. It felt like a bigger step since this time I’d have to pay, and I was a bit nervous about committing in case this was another hobby I would drop a couple months later. But the prices were fair, and there was a sale, so I went for it. Now I’ve officially started the course.

I’ve completed section 2.16 today, and my impression so far is very good. The teacher, Rick Davidson, explains everything clearly and doesn’t overcomplicate things. It definitely helps that I’ve already completed the Junior Programmer Pathway, as a lot of what I’ve done so far in the GameDev.tv course is repetition, but the way he explains it somehow makes it stick more.

So far we’ve gotten an introduction to methods, `Transform.Translate()`, variables, `SerializedField`, keyboard input, colliders and rigidbodies, and Cinemachine. Most of this has been repetition, but I want to highlight the parts where I learned something new.

## Input Manager

My first questions and “aha moments” came when we started writing code for the first game of the course, **Delivery Dash**, in section 2.3 (Transform.Translate). We were creating `if` statements to move our object based on keyboard inputs.

In Unity's course, we did it like this:

```csharp
if(Input.GetKeyDown("space"))
{
  //
}

//or

if(Input.GetKeyDown(KeyCode.w))
{
  //
}
```

(Or at least that’s how I remember it.)

GameDev.tv, however, introduced something new to me:

```csharp
if(Keyboard.current.wKey.isPressed)
{
  //
}
```

I’ve now learned that `Input` is part of the legacy Input Manager, as stated in the [Unity Documentation](https://docs.unity3d.com/ScriptReference/Input.html).

(Unity did introduce us to the new Input Manager, but it was through the Unity interface, and though it was mentioned, we still used the old way for projects.)

This is one of the biggest benefits I’ve noticed so far about the GameDev.tv course. It’s fully updated, actively maintained, and I’m even taking the Beta version, so it’s up to date with current best practices.

## Making the car in the first game Delivery Dash move

When I first tried to make the car move, I wrote all my movement logic directly inside each `if` statement using `moveSpeed` and `steerSpeed`. It worked, but it quickly got repetitive and a bit messy. Then, when I saw how Rick structured it in the course, I realised why he used `move` and `steer` variables first and applied the movement later.

In my version, it looked something like this:

```csharp
if (Keyboard.current.wKey.isPressed)
{
    transform.Translate(0, moveSpeed, 0);
}
else if (Keyboard.current.sKey.isPressed)
{
    transform.Translate(0, -moveSpeed, 0);
}

if (Keyboard.current.aKey.isPressed)
{
    transform.Rotate(0, 0, steerSpeed);
}
else if (Keyboard.current.dKey.isPressed)
{
    transform.Rotate(0, 0, -steerSpeed);
}
```

It worked fine, but the course version was a lot cleaner:

```csharp
float move = 0f;
float steer = 0f;

if (Keyboard.current.wKey.isPressed)
{
    move = 1f;
}
else if (Keyboard.current.sKey.isPressed)
{
    move = -1f;
}

if (Keyboard.current.aKey.isPressed)
{
    steer = 1f;
}
else if (Keyboard.current.dKey.isPressed)
{
    steer = -1f;
}

float moveAmount = move * moveSpeed * Time.deltaTime;
float steerAmount = steer * steerSpeed * Time.deltaTime;

transform.Translate(0, moveAmount, 0);
transform.Rotate(0, 0, steerAmount);
```

By separating the input logic (`move`, `steer`) from the actual movement, it’s easier to read, tweak, and expand later. Like adding acceleration or slowing down when hitting something. It’s such a small change, but it made me realise how much clearer organised code feels compared to when everything’s crammed inside conditionals.

## Cinemachine

I’d actually never heard about Cinemachine before, but Rick introduced it in the course — and it’s honestly really cool. In my earlier Unity projects, I always struggled with camera work and usually just updated the camera position in `Update()` or made it a child of the player. Cinemachine basically takes care of all that for you. It lets you create smooth, dynamic camera movement without needing to write any extra code, and you can easily adjust things like follow speed and framing directly in the inspector. After installing the package, I could simply select add Cinemachine to the hierarchy, select it, and then assign the object I wanted it to follow under "Tracking Target".
You can use **Markdown**, _italics_, `inline code`, or even add images:

![Screenshot of Cinemachine - Tracking Target](/assets/img/Cinemachine.png)

<video controls autoplay muted loop width="100%">
  <source src="/assets/videos/cinemachine_example.mp4" type="video/mp4">
  Sorry, your browser doesn’t support embedded videos.
</video>
